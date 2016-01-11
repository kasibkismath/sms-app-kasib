$(function () {
    function myFunction(dataRec) {
        var data = [
            {
                value: dataRec[0].total,
                color: "#F7464A",
                highlight: "#FF5A5E",
                label: dataRec[0]._id
    },
            {
                value: dataRec[1].total,
                color: "#46BFBD",
                highlight: "#5AD3D1",
                label: dataRec[1]._id
    },
            {
                value: dataRec[2].total,
                color: "#FDB45C",
                highlight: "#FFC870",
                label: dataRec[2]._id
    },
            {
                value: dataRec[3].total,
                color: "#4D4D4D",
                highlight: "#4D4D4D",
                label: dataRec[3]._id
    },
            {
                value: dataRec[4].total,
                color: "#60BD68",
                highlight: "#60BD68",
                label: dataRec[4]._id
    }, {
                value: dataRec[5].total,
                color: "#B2912F ",
                highlight: "#B2912F",
                label: dataRec[5]._id
    }
];

        var options = {
            segmentShowStroke: true,
            segmentStrokeColor: "#fff",
            segmentStrokeWidth: 7,
            animateRotate: true,
            animateScale: false,
        };

        var ctx = document.getElementById("myChart").getContext("2d");
        var myDoughnutChart = new Chart(ctx).Doughnut(data, options);

    }

    $.ajax({
        type: "GET",
        url: "/dashboard/test",
        dataType: "json",
        success: function (response) {
            mydata = response;
            console.log(mydata);
            myFunction(mydata);
        }
    });

});