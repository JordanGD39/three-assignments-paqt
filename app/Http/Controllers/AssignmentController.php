<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DateTime;

class AssignmentController extends Controller
{
    public function FizzBuzz() {
        $displayList = [];

        for ($i=1; $i < 100; $i++) { 
            $displayList[] = $this->GetFizzBuzzDisplay($i);
        }

        $data = [
            'message' => 'Retrieved FizzBuzz sequence',
            'displayList' => $displayList
        ];

        return response()->json($data);
    }

    protected function GetFizzBuzzDisplay($number): string {
        $text = '';

        //If multiple of 3
        if ($number % 3 == 0) {
            $text .= 'Fizz';
        }

        //If multiple of 5
        if ($number % 5 == 0) {
            $text .= 'Buzz';
        }

        if ($text == '') {
            $text = strval($number);
        }

        return $text;
    }

    public function DivideList(Request $request) {
        $list = $request->list;
        $divideNumber = $request->divideNumber;

        if ($divideNumber > 0) {
            $lists = array_chunk($list, $divideNumber);
        }
        else {
            return response()->json(['message' => 'Invalid slice number', 500]);
        }

        $data = [
            'message' => 'Sliced lists!',
            'lists' => $lists
        ];

        return response()->json($data);
    }

    public function GetMondays(Request $request) {
        $date = DateTime::createFromFormat('Y-m-d', $request->startDate);
        $endDate = DateTime::createFromFormat('Y-m-d', $request->endDate);
        
        $mondays = [];

        //6 because otherwise making the end date a sunday will not count it as a full week
        while (!$date || $date->diff($endDate)->days >= 6) {
            if(count($mondays) > 0 || $date->format('D') === 'Mon') {
                $mondays[] = $date->format('Y-m-d');
            }
            
            $date->modify('next Monday');
        }

        $data = [
            'message' => 'Retrieved all Mondays',
            'mondays' => $mondays
        ];

        return response()->json($data);
    }
}