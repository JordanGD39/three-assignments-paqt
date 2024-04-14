import React, { useState } from 'react'
import Form from '../Components/Form'
import PrimaryButton from '../Components/PrimaryButton'
import TextField from '../Components/TextField'
import PageLayout from '../Layout/PageLayout'
import { ApiUtils } from '../Utils/ApiUtils'

export default function DivideCollect() {
    const [numberList, setNumberList] = useState<number[]>([]);
    const [currentNumber, setCurrentNumber] = useState<number>(0);
    const [output, setOutput] = useState<number[][]>([[]]);

    function formatNumber(number: number, index: number, listLength: number): string {
        if (index < listLength - 1) {
            return number + ",";
        }
            
        return number.toString();
    }

    function formatList(list: number[]) {
        let listString = " [ ";
        list.forEach((element, index) => {
            listString += formatNumber(element, index, list.length);
        });

        return listString + " ]";
    }

    function handleSubmit(event: any) {
        event.preventDefault();

        if (numberList.length === 0 || event.target.divideNumber.value <= 0) {
            console.error("No list items or invalid divide number given");
            return;
        }
        
        const formData = new FormData();
        formData.append("divideNumber", event.target.divideNumber.value);

        const promise = ApiUtils.fetchData('DivideCollect.slice', {
            list: numberList, 
            divideNumber: formData.get("divideNumber")
        });
        promise.then((data: any) => data.lists && setOutput(data.lists)).catch(ApiUtils.defaultCatch);
    }

  return (
    <PageLayout>
        <Form onSubmit={handleSubmit}>
            <label>
                List:
                {" [ "}
                <div className='overflow-hidden inline-block max-w-[390px] text-ellipsis translate-y-1/4'>
                    {numberList.length > 0 && numberList.map((val, index) => formatNumber(val, index, numberList.length))}
                </div>
                {" ]"}
            </label>
            <label>
                Number to add
                <div className='flex'>
                <TextField id='number' type='number' extraClassName='rounded-none rounded-tl rounded-bl' value={currentNumber} onChange={(e) => setCurrentNumber(e.target.value)}/>
                <PrimaryButton type='button' extraClassName='rounded-none rounded-tr rounded-br' onClick={() => { 
                        if (currentNumber !== undefined) {
                            setNumberList(numberList => [...numberList, currentNumber]);
                        }
                    }}>
                    Add
                </PrimaryButton>
                </div>
            </label>
            <label>
                Divide number
                <TextField id='divideNumber' type='number'/>
            </label>
            <PrimaryButton type='submit'>Divide</PrimaryButton>
            <label>
                Output: 
                <>
                    {output.length > 0 && output.map(formatList)}
                </>
            </label>
        </Form>
    </PageLayout>
  )
}
