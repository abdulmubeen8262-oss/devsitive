const HeroSection = () => {
    return (
        <section className=" padding_section w-full bg-linear-to-l h-screen flex  items-center from-yellow-900 via-yellow-800 to-yellow-700 ">


            <section className="w-full md:w-1/2  rounded-xl flex flex-col  gap-12 py-2 px-5">
                <h2 className="text-7xl italic text-white">I'm software enginer in the forntend developer......</h2>

                <button className="bg-blue-200 w-fit rounded-full py-4 px-12 hover:bg-pink-500 hover:text-black transition transform-all duration-500 text-3xl italic"> Submit</button>

            </section>
            <section className="w-full md:w-1/2">

            </section>


        </section>
    )
}


export default HeroSection;