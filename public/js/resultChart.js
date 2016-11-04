    function createChart() {
      var listItems = document.getElementsByTagName("li");
      var dataLabels = [];
      var dataChoice = [];
        
      for(var i = 0; i < listItems.length; i++){
         var poll = "poll"+i;
         var pollIds = document.getElementById(poll).title;
         var pollTitle = document.getElementById(poll).textContent;
         dataLabels.push(pollTitle);
         dataChoice.push(pollIds);
        
      };
      var heading = document.getElementById("signup-heading").textContent;
      
      var backgroundColors = [];
      var Colors = ["#2ecc71", "#3498db","#95a5a6","#9b59b6","#f1c40f","#e74c3c","#34495e"];
      
      for(var x = 0; x <= dataLabels.length; x++){
        backgroundColors.push(Colors[x]);
      }
      
      var data = {
        type: 'pie',
        data: {
          labels: dataLabels,
          datasets: [{
            backgroundColor: backgroundColors,
            data: dataChoice,
          }]
        },
       options: {
          title: {
            display: true,
            text: heading,
            fontSize: 30
          },
         responsive: true,
         maintainAspectRatio: true,
         events:["mousemove", "mouseout", "touchend"],  
        }
      }

      var ctx = document.getElementById("myChart").getContext('2d');
      Chart.defaults.global.defaultFontSize = 25;
      var myChart = new Chart(ctx, data);
    }