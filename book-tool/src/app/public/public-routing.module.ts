import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { TermsConditionsComponent } from './pages/terms-conditions/terms-conditions.component';
import { PricingPoliciesComponent } from './pages/pricing-policies/pricing-policies.component';
import { NoticePrivacyComponent } from './pages/notice-privacy/notice-privacy.component';
import { FeaturesComponentPage } from './pages/features/features.component';
import { SresourcesComponent } from './pages/resources/sresources.component';
import { HelpCenterComponent } from './pages/help-center/help-center.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { BlogComponent } from './pages/blog/blog.component';
import { BlogItemComponent } from './pages/blog/blog-item/blog-item.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'blog/:id', component: BlogItemComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'features', component: FeaturesComponentPage },
      { path: 'help-center', component: HelpCenterComponent },
      { path: 'notice', component: NoticePrivacyComponent },
      { path: 'pricing', component: PricingComponent },
      { path: 'pricing-policies', component: PricingPoliciesComponent },
      { path: 'resources', component: SresourcesComponent },
      { path: 'terms', component: TermsConditionsComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class PublicRoutingModule { }
