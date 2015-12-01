google.setOnLoadCallback(drawTable);
function drawTable(displayData) {
    if (!displayData.length)
        return;

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Chain');
    data.addColumn('number', 'Served');
    data.addColumn('number', 'Inited');
    data.addColumn('date', 'Time');

    var dataArray = [];

    for (var item in displayData) {
        var obj = displayData[item];
        var row = [];
        row.push(obj.chain);
        row.push(obj.served);
        row.push(obj.inited);
        row.push(new Date(obj.time));
        dataArray.push(row);
    }

    data.addRows(dataArray);

    var table = new google.visualization.Table(document.getElementById('table_div'));

    table.draw(data, {showRowNumber: true, width: '100%', height: '100%', alternatingRowStyle: true, sortColumn: 1,sortAscending:false});
}


function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Year', 'Sales', 'Expenses'],
        ['2004', 1000, 400],
        ['2005', 1170, 460],
        ['2006', 660, 1120],
        ['2007', 1030, 540]
    ]);

    var options = {
        title: 'Company Performance',
        curveType: 'function',
        legend: {position: 'bottom'}
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

    chart.draw(data, options);
}

var top10Placments = [];
$.ajax({
    url: "/data/sample_data.json"
}).done(function (data) {
    console.log('Loaded ' + data.length + ' items')
    var sorted = data.sort(function (a, b) {
        return b.served - a.served;
    });
    top10Placments = sorted.slice(0, 10);
    console.log('Sorted top 10');
    drawTable(top10Placments);
});




