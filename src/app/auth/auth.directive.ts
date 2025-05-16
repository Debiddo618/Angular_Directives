import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true
})
export class AuthDirective {
  userType = input.required<Permission>({alias: 'appAuth'});
  private authService = inject(AuthService);

  // Both needed to create a structural directive

  // gives you access to the content of the template
  private templateRef = inject(TemplateRef);

  // a reference to the location of the Template
  private viewContainerRef = inject(ViewContainerRef);


  constructor() {
    effect(()=>{
      if(this.authService.activePermission() === this.userType()){
        // createEmbeddedView needs a template ref and will render it
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
    });
  }

}
