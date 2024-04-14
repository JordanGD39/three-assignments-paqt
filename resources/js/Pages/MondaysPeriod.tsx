import React, { useEffect, useState } from 'react'
import DatePicker from '../Components/DatePicker'
import Form from '../Components/Form'
import PrimaryButton from '../Components/PrimaryButton'
import PageLayout from '../Layout/PageLayout'
import { ApiUtils } from '../Utils/ApiUtils'
import dayjs from "dayjs";

export default function MondaysPeriod() {
    const [mondays, setMondays] = useState<string[]>([])

    function handleSubmit(event: any) {
        event.preventDefault();

        const promise = ApiUtils.fetchData('Mondays.fetch', {
            startDate: event.target.startDate.value,
            endDate: event.target.endDate.value
        });
        promise.then((data: any) => setMondays(data.mondays)).catch(ApiUtils.defaultCatch);
    }

    function formatMondays(monday: string, index: number) {
        const formattedDate = dayjs(monday).format("MM/DD/YYYY");
        if (index < mondays.length - 1) {
            return <>{formattedDate}<br/></>
        }

        return formattedDate;
    }
    
  return (
    <PageLayout>
        <Form onSubmit={handleSubmit}>
            <label>
                Start date
                <DatePicker id='startDate'/>
            </label>
            <label>
                End date
                <DatePicker id='endDate'/>
            </label>
            <PrimaryButton type='submit'>Get Mondays</PrimaryButton>
            <label>
                Output: <br/>
                <>
                    {mondays.map(formatMondays)}
                </>
            </label>
        </Form>
    </PageLayout>
  )
}
