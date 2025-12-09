import { useState, useEffect } from "react";
import { createImage } from "@/shared/utils/createImage";
import Stage from "./Stage";
import { Loader } from "@/shared/components/ui/loader/Loader";

import backgroundImg from "./assets/images/background.png";
import skyImg from "./assets/images/sky.png";
import playerImg from "./assets/images/player.png";

import alimentacionImg from "./assets/images/gastos/alimentacion.png";
import arriendoImg from "./assets/images/gastos/arriendo.png";
import saludImg from "./assets/images/gastos/salud.png";
import serviciosImg from "./assets/images/gastos/servicios.png";
import vestuarioImg from "./assets/images/gastos/vestuario.png";

import cineImg from "./assets/images/gustos/cine.png";
import dulcesImg from "./assets/images/gustos/dulces.png";
import hamburguesaImg from "./assets/images/gustos/hamburguesa.png";
import liquidosImg from "./assets/images/gustos/liquidos.png";
import ocioImg from "./assets/images/gustos/ocio.png";

import tableroImg from "./assets/images/controls/tablero_2.png";
import tableroVidasImg from "./assets/images/controls/tablero_vidas.png";
import corazonVacioImg from "./assets/images/controls/corazon_1.png";
import corazonLlenoImg from "./assets/images/controls/corazon_0.png";

// Audio
import successAudio from "./assets/sounds/success.ogg";
import gameAudio from "./assets/sounds/game.ogg";
import failAudio from "./assets/sounds/fail.mp3";

const GastosGame = () => {
  const [assets, setAssets] = useState<{
    images: HTMLImageElement[];
    audios: HTMLAudioElement[];
  } | null>(null);

  const loadAssets = async () => {
    const imagesPromises = [
      createImage(backgroundImg),
      createImage(skyImg),
      createImage(playerImg),

      // gastos 3 - 7
      createImage(alimentacionImg),
      createImage(arriendoImg),
      createImage(saludImg),
      createImage(serviciosImg),
      createImage(vestuarioImg),

      // gustos 8 - 12
      createImage(cineImg),
      createImage(dulcesImg),
      createImage(hamburguesaImg),
      createImage(liquidosImg),
      createImage(ocioImg),

      createImage(tableroImg),
      createImage(tableroVidasImg),
      createImage(corazonVacioImg),
      createImage(corazonLlenoImg),
    ];

    // Create audio instances with proper settings
    const gameAudioInstance = new Audio(gameAudio);
    gameAudioInstance.preload = "auto";
    gameAudioInstance.loop = true;

    const successAudioInstance = new Audio(successAudio);
    successAudioInstance.preload = "auto";

    const failAudioInstance = new Audio(failAudio);
    failAudioInstance.preload = "auto";

    const audios = [gameAudioInstance, successAudioInstance, failAudioInstance];

    const images = await Promise.all(imagesPromises);
    setAssets({ images, audios });
  };

  useEffect(() => {
    loadAssets();
  }, []);

  return <>{!assets ? <Loader /> : <Stage assets={assets} />}</>;
};

export default GastosGame;
