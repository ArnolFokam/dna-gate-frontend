import { Alert, Badge, Button, Pagination, Table, TableBody, TableCell, TableContainer, TableFooter, TableHeader, TableRow } from '@windmill/react-ui';
import { useEffect, useState } from 'react';
import PageTitle from 'src/components/Typography/PageTitle';
import SectionTitle from 'src/components/Typography/SectionTitle';
import { useAppDispatch, useAppSelector } from 'src/config/store';
import { TrashIcon } from 'src/icons';
import { IBiometricInfo } from 'src/models/biometric-info.model';
import { getApiKey } from 'src/reducers/api-key.reducer';
import { deleteInfo, getInfos } from './biometric-infos.reducer';


function BiometricInfoManagement() {
  const dispatch = useAppDispatch();
  const [pageTable, setPageTable] = useState(1);
  const [dataTable, setDataTable] = useState<IBiometricInfo[]>([]);
  // const [info, setInfo] = useState<IBiometricInfo>();

  const apiKey = useAppSelector(state => state.apikey.key);
  const infos = useAppSelector(state => state.biometrics.infos);
  const loading = useAppSelector(state => state.biometrics.loading);

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = infos.length;

  useEffect(() => {
    dispatch(getApiKey());
  }, [dispatch]);

  useEffect(() => {
    if (apiKey) {
      dispatch(getInfos(apiKey));
    }
  }, [apiKey, dispatch]);

  useEffect(() => {
    setDataTable(infos.slice((pageTable - 1) * resultsPerPage, pageTable * resultsPerPage))
  }, [pageTable, infos]);

  function onPageChangeTable(p: number) {
    setPageTable(p)
  }

  return (
    <>
      <PageTitle>Biometric Infos Management</PageTitle>

      <SectionTitle>Infos</SectionTitle>
      {dataTable.length > 0 ? <TableContainer className="mb-8">
        {<Alert type="success">You have {infos.length} biometric infos. Horray!</Alert>}
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Id</TableCell>
              <TableCell>Biometric Infos type</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable.map((info, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span className="text-sm">{info.id}</span>
                </TableCell>
                <TableCell>
                  {info.hasFacial && <Badge type="success">face</Badge>}&nbsp;
                  {info.hasVocal && <Badge type="warning">voice</Badge>}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button className="disabled:opacity-50" disabled={loading} layout="link" size="small" aria-label="Delete">
                      <TrashIcon className="w-5 h-5" aria-hidden="true" onClick={async () => {
                        if (!loading) {
                          await dispatch(deleteInfo({
                            id: info.id,
                            apiKey
                          }));
                          await dispatch(getInfos(apiKey));
                        }
                      }} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer> : <Alert type="warning">You do not have any biometric info</Alert>}
    </>
  );
};

export default BiometricInfoManagement;

