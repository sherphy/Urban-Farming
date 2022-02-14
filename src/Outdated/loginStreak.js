var getLastRefreshDate = Date();

    useEffect(() => {
        localStorage.setItem("lastRefreshTime", JSON.stringify(getLastRefreshDate));
      }, [getLastRefreshDate]);

    const lastLogTime = localStorage.getItem("lastRefreshTime");
    console.log(lastLogTime);
    var currentTime = Date();
    console.log(currentTime);

    