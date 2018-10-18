import { Component } from '@angular/core';

@Component({
    selector: 'ur-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'uzimtas-rytojus';

    public test() {
        alert('SAKIAU NESPAUSK :(');
    }
}
