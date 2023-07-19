import { Component, Input, OnInit } from '@angular/core';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrorsInterface';

@Component({
  selector: 'mc-backend-error-messages',
  templateUrl: './backend-error-messages.component.html',
  styleUrls: ['./backend-error-messages.component.scss']
})
export class BackendErrorMessagesComponent implements OnInit {
  @Input('backendErrors') backendErrorsProps: BackendErrorsInterface
  errorMessages: string[]

  ngOnInit(): void {
    console.log(this.backendErrorsProps)
    this.errorMessages = Object.keys(this.backendErrorsProps).map((name: string) => {
      const messages = Array.isArray(this.backendErrorsProps[name]) ? this.backendErrorsProps[name].join(', ') : this.backendErrorsProps[name]
      return `${name}: ${messages}`
    })
  }
}
