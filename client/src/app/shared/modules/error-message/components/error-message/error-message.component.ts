import { Component, Input } from '@angular/core';

@Component({
  selector: 'mc-error-message',
  template: `<div>{{messageProps}}</div>`
})
export class ErrorComponent {
  @Input('message') messageProps: string = 'Something went wrong'
}
