import { useState, useEffect, useMemo } from 'react';

const findSubstring = (searchValue, list, paramName, isWave = false) => {
  if (!paramName || !searchValue || !list.length || !(paramName in list[0]))
    return [];

  return list
    .filter((elem) => {
      const elemParamValue = elem[paramName].toString().toLowerCase();

      if (searchValue.length > elemParamValue.length) return false;
      if (searchValue === elemParamValue.substring(0, searchValue.length))
        return true;

      if (isWave && elemParamValue.includes(searchValue)) return true;

      return false;
    })
    .map((item) => ('roomId' in item ? item.roomId : item.id));
};

const normalizing = (val) => val.toString().toLowerCase();
// const createReqList = () => {}

/*
    <<__DOCUMENTATION__>>
    {
        dataList
            {
                dataId: [...],

            },
        reqList: [
            {
                reqDataId: "",
                reqParamName: "",
                reqIsWave: bool
            }
        ]
    }
*/

/* 
    params: {
        sorsParam,
        mainDataId
    }
*/

const createReqSearchObject = (listReqSearchParams) =>
  listReqSearchParams.map((elem) => ({
    reqDataId: elem[0],
    reqParamName: elem[1],
    reqIsWave: elem.length > 2 ? elem[2] : false,
  }));

const useSearch = ({ dataList, reqList, mainDataId }) => {
  const mainData = useMemo(
    () => [...dataList[mainDataId]],
    [dataList, mainDataId],
  );
  const [searchValue, setSearchValue] = useState('');
  const [returnedActualData, setReturnedActualData] = useState([...mainData]);

  useEffect(() => {
    const findValues = reqList.reduce(
      (acc, req) => [
        ...acc,
        ...findSubstring(
          normalizing(searchValue),
          dataList[req.reqDataId],
          req.reqParamName,
          req?.reqIsWave,
        ),
      ],
      [],
    );

    const uniqueIds = [...new Set(findValues)];

    const actualData = uniqueIds
      .map((id) => mainData.find((elem) => id === elem.id))
      .sort((a, b) => a.name.localeCompare(b.name));

    const returnedActualDataForSetState = searchValue.toString().length
      ? actualData
      : mainData.sort((a, b) => a.name.localeCompare(b.name));

    setReturnedActualData(returnedActualDataForSetState);
  }, [searchValue]);

  return {
    searchValue,
    setSearchValue,
    returnedActualData,
  };
};

export { createReqSearchObject };
export default useSearch;
