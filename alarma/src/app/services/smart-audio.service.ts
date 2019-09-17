import { Injectable } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Platform } from '@ionic/angular';
import { IntervaloSonido } from '../classes/intervalo-sonido';

@Injectable()
export class SmartAudioService {

    audioType = 'html5';
    sounds: any = [];
    intervalos: IntervaloSonido[];

    constructor(public nativeAudio: NativeAudio, platform: Platform) {
        if (platform.is('cordova')) {
            this.audioType = 'native';
        }

        this.intervalos = new Array();
    }

    preload(key, asset) {

        if (this.audioType === 'html5') {

            const audio = {
                key: key,
                asset: asset,
                type: 'html5'
            };

            this.sounds.push(audio);

        } else {
            this.nativeAudio.preloadComplex(key, asset, 100, 1, 0)
            .catch(error => {
                alert('Error in preload:' + error + ' ' + key + ' ' + asset);
            });

            const audio = {
                key: key,
                asset: asset,
                type: 'native'
            };

            this.sounds.push(audio);
        }

    }

    play(key) {

        const audio = this.sounds.find((sound) => {
            return sound.key === key;
        });
        if (audio.type === 'html5') {

            const audioAsset = new Audio(audio.asset);
            audioAsset.play();

        } else {

            this.nativeAudio.play(audio.key).then((res) => {
                console.log(res);
            }, (err) => {
                console.log(err);
            });

        }

    }

    playInterval(key: string, timeBetweenRepeats: number) {
        if (this.getIntervalId(key, false) == null) {
            const idIntervalo = setInterval( x => {
                this.play(key);
            }, timeBetweenRepeats);
            this.intervalos.push(new IntervaloSonido(key, idIntervalo));
        }
    }

    stopInterval(key: string) {
        const intervalID = this.getIntervalId(key, true);
        clearInterval(intervalID);
    }

    private getIntervalId(key: string, remove: boolean): any {
        let retorno = null;
        let indice = null;

        if (this.intervalos) {
            this.intervalos.forEach( x => {
                if (x.key === key) {
                    retorno = x.intervalId;
                    indice = this.intervalos.indexOf(x, 0);
                }
            });
            if (indice != null && remove) {
                this.intervalos.splice(indice, 1);
            }
        }
        return retorno;
    }

}