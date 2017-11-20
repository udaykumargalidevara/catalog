$(document).ready(function() 
{    
    //connecting to the database
    var rootref = firebase.database().ref("products");
    //ret data from db and display on the web page
    rootref.on("child_added",snap=>{
        console.log("added:", snap.key);
        var newPostKey = snap.key;
        var product=snap.child('ProductName').val();
		var model=snap.child('Model').val();
		var ram=snap.child('RamSize').val();
		var hd = snap.child('HardDisk').val();
		var os = snap.child('OS').val();
		var processor = snap.child('Processor').val();
		var BuiltOn = snap.child('BuiltOn').val();
		var DisplaySize = snap.child('DisplaySize').val();
		var Make = snap.child('Make').val();
        localStorage.setItem(newPostKey,[product,model,ram,hd,os,processor,BuiltOn,DisplaySize,Make]);
        
	});
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key( i );
        
        var x =localStorage.getItem( localStorage.key( i )).split(',');
         localStorage.removeItem('firebase:host:firstproject-e41ea.firebaseio.com');
        
        $('#tablebody').append("<tr><td>"+x[0]+"</td><td>"+x[1]+"</td><td>"+x[2]+"</td><td>"+x[3]+"</td><td>"+x[4]+"</td><td>"+x[5]+"</td><td>"+x[6]+"</td><td>"+x[7]+"</td><td>"+x[8]+"</td><td><button type='button' id='delete' data-id="+key+" class='btn btn-danger btn-sm'><span class='glyphicon glyphicon-trash'></span></button> <button type='button' id='edit' data-id="+key+" class='btn btn-info btn-sm' data-toggle='modal' data-target='#myedit'><span class='glyphicon glyphicon-edit'></span></button></td></tr>");
        
    }
    //adding a new product
	$(document).on('submit','#myform',function(){
    var product = $('#pn').val();
    var model  = $('#model').val();
    var ram = $('#ram').val();
    var hd = $('#hd').val();
    var os = $('#os').val();
    var processor = $('#processor').val();
    var builtOn = $('#bo').val();
    var size = $('#displaysize').val();
    var make = $('#make').val();
    var newRef  = rootref.push();
    newRef.set({
         	'ProductName':product,
         	'Model':model,
         	'RamSize':ram,
         	'HardDisk':hd,
         	'OS':os,
         	'Processor':processor,
         	'BuiltOn':builtOn,
         	'DisplaySize':size,
         	'Make':make
              });
	});
    //deleting the product
  $(document).on('click','#delete',function(){
    alert(this.dataset.id);
      console.log(this.dataset.id+"delete");
      var rem =this.dataset.id;
      rootref.child(rem).remove();
      console.log(rem);
      localStorage.removeItem(rem);
      location.reload();
     
   });  

});