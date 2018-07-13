$.get('/getData',function(err,data){
    if(err){console.log(err)}
    for(var i=0;i<data.length;i++){
        var climbingRow=$("<tr>");
        climbingRow.text(data[i]);
        $("#space").append("<h4>Name: " + data[i].name + " Link: " + data[i].link + " Grade: " + data[i].grade + "</h4>")
    }
})