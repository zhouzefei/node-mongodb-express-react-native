$(function(){
	$('.del').on('click',function(){
		var id=$(this).data('id');
		var $this=$(this).closest('tr');
		$.ajax({ 
			url: "/admin/remove/", 
			type: 'POST', 
			data:{'_id':id},
			dataType:'json',
			success: function (data) { 
				if(data.ok==1){
					$this.remove();
				}
			}
		});
	})
});