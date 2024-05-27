import React, {useState , useEffect} from 'react'
import './Showpiece.css'

function Showpiece(){

    const colordata = [
        {id: "0" ,name:"https://ketab.pk/wp-content/uploads/2022/07/51-uspgqWIL._AC_SY780_.jpg" , color: "#3b82f6"},
        {id: "1" ,name:"https://m.media-amazon.com/images/I/813aV273-rL._AC_UF1000,1000_QL80_.jpg" , color: "#16a34a"},
        {id: "2" ,name:"https://m.media-amazon.com/images/I/41amV20d1uL.jpg" , color: "#ef4444"},
        {id: "3" ,name:"https://m.media-amazon.com/images/I/71eoUH2EngL._AC_UF1000,1000_QL80_.jpg" , color: "#eab308"},
        {id: "4" ,name:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2Oz7-K1SyY7BmRjr3zSc5TEXf-L8QeaDtJ022P9vl7g&s" , color: "#db2777"},
        {id: "5" ,name:"https://m.media-amazon.com/images/I/71cx7DCQblL._AC_UF1000,1000_QL80_.jpg" , color: "#14b8a6"},
        {id: "6" ,name:"https://m.media-amazon.com/images/I/617-2I06oGL._AC_UF1000,1000_QL80_DpWeblab_.jpg" , color: "#f97316"}
    ];

    // const [showElement, setShowElement] = useState(false);
    // useEffect(() => {
    //     setTimeout(function () {
    //     setShowElement(true);
    //     }, 2000)
    // }, []);
    

    return (
        <div className='Showpiece'>
            {
                colordata.map((data) => {
                    if(data.id <= 3){
                        return (
                            <img className='bookcard' src={data.name} style={{marginTop:80*data.id}}/>
                        )
                    }
                    else if(data.id <= 6){
                        return (
                            <img className='bookcard' src={data.name} style={{marginTop:80*(6-data.id)}}/>
                        )
                    }
                }) 
                // setTimeout(() => {
                    
                // },3000)
                
                // colordata.forEach((data) => {
                //     setTimeout(() => {
                //         let marginTop = 0;
                //         if(data.id <= 3){                
                //             marginTop = 80 * data.id;                
                //         } else if(data.id <= 6){                
                //             marginTop = 80 * (6 - data.id);               
                //         } 
                //         const img = <img className='bookcard' src={data.name} style={{marginTop}}/>;                
                //         // Assuming you have a container element to append the images to
                //         // container.appendChild(img); 
                //     }, 3000*data.id)
                // })
            }
        </div>
    )
}

export default Showpiece