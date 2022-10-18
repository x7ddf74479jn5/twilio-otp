import type { NextPage } from "next";
import axios from "@/lib/axios";

const Home: NextPage = () => {
  const axiosTest = async (): Promise<void> => {
    try {
      const response = await axios.get("/api/proxy/latest?base=JPY");
      window.alert(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world</h1>
      <button onClick={axiosTest}>Pokeapi</button>
    </div>
  );
};

export default Home;
