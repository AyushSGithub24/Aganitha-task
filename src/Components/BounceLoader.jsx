import "./loader.css"
function BounceLoader() {
  return (
<div className="flex justify-center items-center mt-5"> 
<div className="typewriter">
    <div className="slide"><i></i></div>
    <div className="paper"></div>
    <div className="keyboard"></div>
</div> 
</div>   
  );
}

export default BounceLoader;
