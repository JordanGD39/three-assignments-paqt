import React, { PropsWithChildren, useEffect, useState } from 'react'
import PageLayout from '../Layout/PageLayout'
import { ApiUtils } from '../Utils/ApiUtils'
import numberBeatPath from '../../sounds/Beat.mp3'
import fizzBuzzBeatPath from '../../sounds/OtherBeat.mp3'

let counter: any;

export default function FizzBuzz() {
    const [sequence, setSequence] = useState<string | number[]>([]);
    const [indexCounter, setIndexCounter] = useState(0);
    const [started, setStarted] = useState(false);
    const [color, setColor] = useState<string>('transparent');

    const numberBeat = new Audio(numberBeatPath);
    const fizzBuzzBeat = new Audio(fizzBuzzBeatPath);

    useEffect(() => {
        const promise = ApiUtils.fetchData('FizzBuzz.fetch');
        promise.then((data: any) => setSequence(data.displayList)).catch(ApiUtils.defaultCatch);
    }, []);

    useEffect(() => {
        if (started) {
        showEffect(0);
          counter = setInterval(() => setIndexCounter(indexCounter => indexCounter + 1), 400);
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
            showEffect(0);
            clearInterval(counter);
            return;
        }

        showEffect(indexCounter);
    }, [indexCounter])

    function showEffect(index: number) {
        if (parseInt(sequence[index].toString())) {
            numberBeat.play();
            setColor('transparent');
            return;
        }

        fizzBuzzBeat.play();

        switch (sequence[index]) {
            case 'Fizz':
                setColor('blue');
                break;
            case 'Buzz':
                setColor('red');
                break;
            default:
                setColor('magenta');
                break;
        }
    }

    function getText() {
        if (!started) {
            return sequence.length > 0 ? "Click to start FizzBuzz!" : "Loading";
        }
        return indexCounter < sequence.length && sequence[indexCounter];
    }

  return (
    <PageLayout>
        <div onClick={() => setStarted(true)} style={{pointerEvents: started ? "none": 'auto', backgroundColor: color}} className='flex-1 flex items-center justify-center cursor-pointer transition-colors duration-300'>
            <h1 className='font-bold text-4xl pointer-events-none'>
                {getText()}
            </h1>
        </div>
    </PageLayout>
  )
}
