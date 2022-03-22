import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PublicRoutingModule } from './public-routing.module';
import { NgxMasonryModule } from 'ngx-masonry';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/components/shared.module';
import { NgModule } from '@angular/core';

import { FeaturesComponentPage } from './pages/features/features.component';
import { PricesFaqComponent } from './pages/pricing/components/prices-faq/prices-faq.component';
import { HomeComponent } from './pages/home/home.component';
import { BlogComponent } from './pages/blog/blog.component';

import { DetailedFeaturesComponent } from './pages/home/components/detailed-features/detailed-features.component';
import { TermsConditionsComponent } from './pages/terms-conditions/terms-conditions.component';
import { PricingPoliciesComponent } from './pages/pricing-policies/pricing-policies.component';
import { NoticePrivacyComponent } from './pages/notice-privacy/notice-privacy.component';
import { PricesTableComponent } from './pages/pricing/components/prices-table/prices-table.component';
import { HelpCenterComponent } from './pages/help-center/help-center.component';
import { SresourcesComponent } from './pages/resources/sresources.component';
import { ResourcesComponent } from './pages/home/components/resources/resources.component';
import { CarouselComponent } from './pages/home/components/carousel/carousel.component';
import { FirstRowComponent } from './pages/pricing/components/first-row/first-row.component';
import { FeaturesComponent } from './pages/home/components/features/features.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ReadyComponent } from './pages/home/components/ready/ready.component';
import { AboutComponent } from './pages/about/about.component';
import { WhyComponent } from './pages/home/components/why/why.component';
import { BlogItemComponent } from './pages/blog/blog-item/blog-item.component';

@NgModule({
  imports: [
    PublicRoutingModule,
    ReactiveFormsModule,
    NgxMasonryModule,
    TranslateModule.forChild(),
    CommonModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    HomeComponent,
    BlogComponent,
    FeaturesComponentPage,
    CarouselComponent,
    FeaturesComponent,
    ResourcesComponent,
    DetailedFeaturesComponent,
    ReadyComponent,
    PricingComponent,
    FirstRowComponent,
    PricesTableComponent,
    PricesFaqComponent,
    WhyComponent,
    AboutComponent,
    ContactComponent,
    SresourcesComponent,
    HelpCenterComponent,
    NoticePrivacyComponent,
    TermsConditionsComponent,
    PricingPoliciesComponent,
    BlogItemComponent
  ]
})
export class PublicModule { }
