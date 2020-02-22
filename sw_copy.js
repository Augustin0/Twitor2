function filtroCalback(cache,req,res){
        return caches.open(cache)
        .then(e=>
        {
        e.put(req,res.clone())
        return res.clone()
        }).catch(e=>{console.log(e);})        
}