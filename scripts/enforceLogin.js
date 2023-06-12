getCurrentUserId().then((userId)=>{
    console.log("deneme " + userId)
    if (userId == -1){
        showLoginPanel()
   }
})