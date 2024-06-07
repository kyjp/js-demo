'use clients'
import React, { useState } from 'react'
import MaterialComponent from './MaterialComponent';

const MaterialWrapper = () => {
    const [textureUrl, setTextureUrl] = useState('https://fastly.picsum.photos/id/1060/536/354.jpg?blur=2&hmac=0zJLs1ar00sBbW5Ahd_4zA6pgZqCVavwuHToO6VtcYY');
    const [thickness, setThickness] = useState(0.05);

    const changeTexture = (event: any) => {
        // 新しい画像のURLをセットする
        console.log(event)
        setTextureUrl(event.target.innerText);
    };

    const changeThickness = (event: any) => {
        // 新しい厚みをセットする
        console.log(event)
        setThickness(Number(event.target.textContent
        ));
    };
  return (
    <div className="relative">
        <MaterialComponent textureUrl={textureUrl} thickness={thickness} />
        <div className="absolute left-0 top-0">
            <h2>画像切り替え</h2>
            <button className="rounded bg-slate-400 mr-2" onClick={changeTexture}>https://lh3.googleusercontent.com/d/1vmKFiZwkNIR6xyqjLBIvyP2ZnIGfw0TD=w670?authuser=0</button>
            <button className="rounded bg-slate-400"onClick={changeTexture}>https://fastly.picsum.photos/id/1060/536/354.jpg?blur=2&hmac=0zJLs1ar00sBbW5Ahd_4zA6pgZqCVavwuHToO6VtcYY</button>
            <h3>厚み切り替え</h3>
            <button className="rounded bg-slate-400 mr-2" onClick={changeThickness}>0.05</button>
            <button className="rounded bg-slate-400" onClick={changeThickness}>0.1</button>
        </div>
    </div>
  )
}

export default MaterialWrapper