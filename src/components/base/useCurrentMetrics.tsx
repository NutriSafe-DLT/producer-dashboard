import axiosMetricsInstance from "../../prometheusAxios";
import React, { useEffect } from 'react';

const SECONDS_TO_WAIT_BETWEEN_STATUSCHECKS = 5;


function useCurrentMetrics() {
    const [time, setTime] = React.useState(new Date().toLocaleTimeString());
    const [isHyperledgerAvailable, setIsHyperledgerAvailable] = React.useState(false);
    const [metricsList, setMetricsList] = React.useState(["up","fabric_version"]);
    //This is a continual check so it triggers every X seconds (see constant) while the app is running
    useEffect(() => {
        axiosMetricsInstance.get("/api/v1/query",{params: {query:"fabric_version"}}).
    then((response) => {
      setIsHyperledgerAvailable(true);
    }).catch((reason) => {
      if (reason.response && reason.response.status ) {
        //usually 4XX or 5XX errors, but that only means that there is an issue with prometheus, not necessarily with fabric itself
        setIsHyperledgerAvailable(true);
      } else {
        console.log("Endpoint query failed with status: " + reason);
        setIsHyperledgerAvailable(false);
      }  
    });
  
    const timeout = setTimeout(() => {
      setTime(new Date().toLocaleTimeString())
    }, SECONDS_TO_WAIT_BETWEEN_STATUSCHECKS * 1000);

    return () => {
      clearTimeout(timeout);
    }
  }, [time]);
  
  return isHyperledgerAvailable;
}



export default useCurrentMetrics;