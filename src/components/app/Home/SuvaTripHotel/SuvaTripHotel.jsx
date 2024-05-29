
import React from 'react';

const SuvaTripHotel = () => {
     return (
          <div className='my-16'>
               <div>
                    <h1 className='text-[60px] font-bold text-center mb-10'>7 Reasons Why Use
                         <span className='text-red-500'> INFINITE</span><span className='text-green-500'>BLUE</span></h1>
                    {/* <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-screen-xl mx-auto'>
                         {
                              hotel.map((item, index) =>
                                   <div key={index} className='mb-10 space-y-5'>
                                        <div className=''>
                                             <img className='mx-auto mb-4 w-36 h-36 rounded-full object-cover' src={item?.image} alt="" />
                                        </div>
                                        <div className='text-xl text-center ms-5'>
                                             <h1>{item?.title}</h1>
                                        </div>
                                   </div>
                              )
                         }
                    </div> */}
                    <div className='flex justify-center'>
                         <img src="https://i.ibb.co/zsPkLr6/Screenshot-2023-12-25-232118.png" alt="hotel" />
                    </div>
               </div>
          </div>
     );
};

export default SuvaTripHotel;