import React, { useEffect, useState } from 'react'
import PageTitle from 'src/components/Typography/PageTitle';
import SectionTitle from 'src/components/Typography/SectionTitle';
import { Button, HelperText, Input, Label } from '@windmill/react-ui';
import { useAppDispatch, useAppSelector } from 'src/config/store';
import { getApiKey, renewApiKey } from 'src/reducers/api-key.reducer';
import Tippy from '@tippyjs/react';

import { DocumentDuplicateIcon, RefreshIcon } from '@heroicons/react/solid';
import { toast } from 'react-toastify';


function ApiKeyManagement() {
  const dispatch = useAppDispatch();
  const apiKey = useAppSelector(state => state.apikey.key);
  const loading = useAppSelector(state => state.apikey.loading);
  const apiKeySuccessMessage = useAppSelector(state => state.apikey.successMessage);
  const [visibleSuccessCopy, setvisibleSuccessCopy] = useState(false);
  const hide = () => setvisibleSuccessCopy(false);

  useEffect(() => {
    if (apiKeySuccessMessage) {
      toast.success(apiKeySuccessMessage);
    }
  }, [apiKeySuccessMessage]);

  const handleCopyClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setvisibleSuccessCopy(true);
    setTimeout(() => setvisibleSuccessCopy(false), 3000);
  };

  useEffect(() => {
    dispatch(getApiKey());
  }, [dispatch]);

  const handleRenewApiKey = () => {
    dispatch(renewApiKey());
  }

  return (
    <>
      <PageTitle>Api Key Management</PageTitle>

      <SectionTitle>Api Key</SectionTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <Label>
            <span>Renew or copy</span>
            {apiKey != null ?
              <>
                <Tippy content="Copied!" visible={visibleSuccessCopy} onClickOutside={hide}>
                  <div>{/** wrap disabled input because tippy does not work on disabled components */}
                    <Input className="mt-5 mb-2" css={undefined} value={apiKey} type="password" disabled />
                  </div>
                </Tippy>
                <HelperText>Copy this key to make API requests</HelperText>
                <div className="flex flex-wrap justify-end">
                  {loading && <div className="flex justify-center items-center m-2">
                    <div
                      className="
                        animate-spin
                        rounded-full
                        h-4
                        w-4
                        border-t-2 border-b-2 border-purple-500
                      "
                    ></div>
                  </div>}
                  <Button className="my-3 mx-1" icon={RefreshIcon} layout="outline" aria-label="Renew api key" onClick={() => handleRenewApiKey()} />
                  <Button className="my-3 mx-1" icon={DocumentDuplicateIcon} aria-label="Copy api key" onClick={() => handleCopyClipboard(apiKey)} />
                </div>
              </> : <h4 className="text-lg font-semibold text-center text-gray-400 my-4">No api key...</h4>}
          </Label>
        </div>
      </div>
    </>
  );
};

export default ApiKeyManagement;

