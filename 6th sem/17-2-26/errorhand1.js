function dosomething(){
    throw new error(
        'a error is thrown from do something');
    }
    function init(){
        try{
            dosomething();
        }
        catch(e)
        {
            console.log(e);
        }
        console.log(
            "after successful error handling"
        );
        
  
    }
    init();