import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../services/calendar.service';
import {
  isSameMonth,
  addDays,
  subDays,
  lastDayOfMonth,
  startOfMonth,
  lastDayOfWeek,
  startOfWeek,
} from 'date-fns';
@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css'],
})
export class CalendarViewComponent implements OnInit {
  month: any[] = [];
  week: any[];
  monthDate: any = new Date();
  weekDate: any = new Date();
  selectButton: string = 'month';
  constructor(private _calendarService: CalendarService) {}

  getWeekData = (date) => {
    this.week = this._calendarService.takeWeek(date)();
  };

  getMonthData = (date) => {
    let monthData = [];
    this._calendarService
      .takeMonth(date)()
      .forEach((eachWeek) =>
        eachWeek.forEach((eachDay) => {
          if (isSameMonth(eachDay, date)) {
            monthData.push(eachDay);
          }
        })
      );
    this.month = monthData;
  };

  ngOnInit(): void {
    this.getWeekData(this.weekDate);
    this.getMonthData(this.monthDate);
  }

  onToggleButton = (value: string) => {
    if (value == 'month') {
      this.selectButton = 'month';
    } else {
      this.selectButton = 'week';
    }
  };

  onClickBack = () => {
    let firstDayMonth = startOfMonth(this.monthDate);
    this.monthDate = subDays(firstDayMonth, 1);
    this.getMonthData(this.monthDate);

    let firstDayWeek = startOfWeek(this.weekDate);
    this.weekDate = subDays(firstDayWeek, 1);
    this.getWeekData(this.weekDate);
  };

  onClickNext = () => {
    let lastDayMonth = lastDayOfMonth(this.monthDate);
    this.monthDate = addDays(lastDayMonth, 1);
    this.getMonthData(this.monthDate);

    let lastDayWeek = lastDayOfWeek(this.weekDate);
    this.weekDate = addDays(lastDayWeek, 1);
    this.getWeekData(this.weekDate);
  };
}
