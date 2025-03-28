/* eslint-disable @typescript-eslint/no-explicit-any */


const MainContent = ({switching}:any) => {
 
    return (
        <main className="text-center py-8 ">
          <h1 className="text-5xl md:text-5xl font-bold w-5xl">
            Make quick changes to your <span className="text-yellow-400">{switching}</span> files with an intuitive and powerful grid.
          </h1>
          <p className="mt-4 text-lg">
            The fastest way to edit, update, and manage your data seamlessly.
           </p>
          
         
        </main>
      );
}

export default MainContent