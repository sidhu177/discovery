import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ResourcesComponent } from './pages/resources/resources.component';
import { HelpComponent } from './pages/help/help.component';
import { OasisSbInfoComponent } from './pages/contract-vehicles/oasis-sb-info.component';
import { BmoInfoComponent } from './pages/contract-vehicles/bmo-info.component';
import { HcatsComponent } from './pages/contract-vehicles/hcats.component';
import { PssComponent } from './pages/contract-vehicles/pss.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { Error404Component } from './pages/error404/error404.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'resources', component: ResourcesComponent },
  { path: 'oasis', component: OasisSbInfoComponent },
  { path: 'bmo', component: BmoInfoComponent },
  { path: 'help', component: HelpComponent },
  { path: 'hcats', component: HcatsComponent },
  { path: 'pss', component: PssComponent },
  { path: '', component: WelcomeComponent },
  { path: '**', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
