import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useState } from 'react';
import type{ GetServerSideProps, NextPage } from 'next';

interface searchCatImage{
  id: string;
  url: string;
  width: number;
  height: number;
}

interface IndexPageProps {
  initialCatImageUrl: any;
}
const inter = Inter({ subsets: ['latin'] })

const newCatImage= async(): Promise<searchCatImage>=> {
const res = await fetch("https://api.thecatapi.com/v1/images/search")
const result = await res.json();
//console.log(result[0]);
return result[0];
};

const Home: NextPage<any>=(initialCatImageUrl)=>
//export default function Home({initialCatImageUrl}) 
{

  const [catImageUrl, setCatImageUrl] = useState(initialCatImageUrl);
  //const catImageUrl2 = ("https://api.thecatapi.com/v1/images/search")

  const handleClick= async ()=> {
  const catImage = await newCatImage();
  setCatImageUrl(catImage.url);

}

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh"

    }}>
    <h1>猫画像アプリ</h1>
    <img 
       src={catImageUrl}
       width={400}
       height="auto"
    />
    <button style={{marginTop: 18}}onClick={handleClick}>猫ボタン</button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<
 IndexPageProps
>= async () => {
  const catImage = await newCatImage();
  return{
    props:{
      initialCatImageUrl: catImage.url,
    }
  }
}
export default Home;