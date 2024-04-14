import React, { PropsWithChildren, useEffect, useState } from 'react'
import PageLayout from '../Layout/PageLayout'
import { ApiUtils } from '../Utils/ApiUtils'
import numberBeatPath from '../../sounds/Beat.mp3'
import fizzBuzzBeatPath from '../../sounds/OtherBeat.mp3'

export default function FizzBuzz() {
    const [sequence, setSequence] = useState<string | number[]>([]);
    const [indexCounter, setIndexCounter] = useState(0);
    const [started, setStarted] = useState(false);
    let counter: any;

    const numberBeat = new Audio(numberBeatPath);
    const fizzBuzzBeat = new Audio(fizzBuzzBeatPath);

    useEffect(() => {
        const promise = ApiUtils.fetchData('FizzBuzz.fetch');
        promise.then((data: any) => setSequence(data.displayList)).catch(ApiUtils.defaultCatch);
    }, []);

    useEffect(() => {
        if (started) {
        playSound(0);
          counter = setInterval(() => setIndexCounter(indexCounter => indexCounter + 1), 600);
        }
        return () => {
          clearInterval(counter);
        };

    }, [started])

    useEffect(() => {
        if (!started) {
            return;
        }

        if (indexCounter >= sequence.length) {
            clearInterval(counter);
            return;
        }

        playSound(indexCounter);
    }, [indexCounter])

    function playSound(index: number) {
        if (parseInt(sequence[index].toString())) {
            numberBeat.play();
            return;
        }

        fizzBuzzBeat.play();
    }

    function getText() {
        if (!started) {
            return sequence.length > 0 ? "Click to start FizzBuzz!" : "Loading";
        }
        return indexCounter < sequence.length && sequence[indexCounter];
    }

  return (
    <PageLayout>
        <div onClick={() => setStarted(true)} style={{pointerEvents: started ? "none": 'auto'}} className='flex-1 flex items-center justify-center cursor-pointer'>
            <h1 className='font-bold text-4xl pointer-events-none'>
                {getText()}
            </h1>
        </div>
    </PageLayout>
  )
}
