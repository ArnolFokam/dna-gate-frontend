import React, { useEffect } from 'react';

import { Bar, Doughnut } from 'react-chartjs-2';

import InfoCard from 'src/components/Card/InfoCard';
import ChartCard from 'src/components/Chart/ChartCard';
import ChartLegend from 'src/components/Chart/ChartLegend';
import RoundIcon from 'src/components/RoundIcon';
import PageTitle from 'src/components/Typography/PageTitle';
import { EditIcon, PeopleIcon, SearchIcon } from 'src/icons';
import { DocumentAddIcon } from '@heroicons/react/solid';

import {
  doughnutOptions,
  barOptions,
  getDoughnutData,
  getLegends,
  getBarChartData,
} from 'src/helpers/chartsOptions';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/config/store';
import { getAllMetrics } from 'src/reducers/metrics.reducer';
import { isObjectEmpty } from 'src/helpers/objects';
import { get7DaysHistogram } from 'src/helpers/metrics';
import { getLastSevenDays } from 'src/helpers/date';

function Dashboard() {

  const dispatch = useDispatch();
  const infosRatio = useAppSelector(state => state.metrics.infosRatio);
  const totalUsage = useAppSelector(state => state.metrics.totalUsage);
  const usageHistory = useAppSelector(state => state.metrics.usageHistory);

  useEffect(() => {
    dispatch(getAllMetrics());
  }, [dispatch]);

  return (
    <>
      <PageTitle>Dashboard</PageTitle>

      {!isObjectEmpty(totalUsage) && <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total biometric infos" value={totalUsage["biometric_infos"]}>
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Total verification queries" value={totalUsage["verifications"]}>
          <RoundIcon
            icon={SearchIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Total creation queries" value={totalUsage["creations"]}>
          <RoundIcon
            icon={DocumentAddIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Total updates queries" value={totalUsage["updates"]}>
          <RoundIcon
            icon={EditIcon}
            iconColorClass="text-red-500 dark:text-red-100"
            bgColorClass="bg-red-100 dark:bg-red-500"
            className="mr-4"
          />

        </InfoCard>
      </div>}

      <div className="grid gap-6 mb-8 place-items-start xs:grid-cols-1 md:grid-cols-6">
        {!isObjectEmpty(usageHistory) && <div className="h-auto  place-self-stretch col-span-4">
          <ChartCard title="Usage History (last 7 days)">
            <Bar data={getBarChartData([
              get7DaysHistogram(usageHistory["verifications"]),
              get7DaysHistogram(usageHistory["creations"]),
              get7DaysHistogram(usageHistory["updates"])
            ], 
            getLastSevenDays(new Date()),
            ["Verifications", "Creations", "Updates"],
            ["#0694a2", "#7e3af2", "#e53e3e"])} {...barOptions} />
            <ChartLegend legends={getLegends(
              ["Verifications", "Creations", "Updates"],
              ["bg-teal-500", "bg-blue-600", "bg-red-600"]
            )} />
          </ChartCard>
        </div>}

        {!isObjectEmpty(infosRatio) && <ChartCard title="Biometrics Info Ratio">
          <Doughnut data={
            getDoughnutData(
              Object.values(infosRatio),
              Object.keys(infosRatio)
            )
          } {...doughnutOptions} />
          <ChartLegend legends={getLegends(
            [`Face(${infosRatio["face"]})`, `Voice(${infosRatio["voice"]})`]
          )} />
        </ChartCard>}
      </div>
    </>
  );
};

export default Dashboard;

