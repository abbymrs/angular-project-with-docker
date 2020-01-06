import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { DropdownModule } from "primeng/dropdown";
import { CheckboxModule } from "primeng/checkbox";
import { PaginatorModule } from "primeng/paginator";
import { MultiSelectModule } from "primeng/multiselect";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { TableModule } from "primeng/table";
import { PanelModule } from "primeng/panel";
import { ToastModule } from "primeng/toast";
import { AutoCompleteModule } from "primeng/autocomplete";
import { CarouselModule } from "primeng/carousel";
import { AccordionModule } from "primeng/accordion";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { DynamicDialogModule } from "primeng/dynamicdialog";
import { InputSwitchModule } from "primeng/inputswitch";
import { CalendarModule } from "primeng/calendar";

import { SidebarMenuComponent } from "./components/sidebar-menu/sidebar-menu.component";
import { LoadingComponent } from "./components/loading/loading.component";
import { SearchGroupComponent } from "./components/search-group/search-group.component";
import { InputComponent } from "./components/input/input.component";
import { SelectComponent } from "./components/select/select.component";
import { TransformStatusPipe } from "./pipes/transform-status.pipe";

@NgModule({
  declarations: [
    SidebarMenuComponent,
    LoadingComponent,
    InputComponent,
    SearchGroupComponent,
    SelectComponent,
    TransformStatusPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    PanelModule,
    TableModule,
    ProgressSpinnerModule,
    ToastModule,
    MultiSelectModule,
    CheckboxModule,
    DropdownModule,
    AutoCompleteModule,
    PaginatorModule,
    CarouselModule,
    AccordionModule,
    ConfirmDialogModule,
    DynamicDialogModule,
    InputSwitchModule,
    CalendarModule
  ],
  exports: [
    InputTextModule,
    ButtonModule,
    PanelModule,
    TableModule,
    ProgressSpinnerModule,
    ToastModule,
    MultiSelectModule,
    CheckboxModule,
    DropdownModule,
    AutoCompleteModule,
    PaginatorModule,
    CarouselModule,
    AccordionModule,
    SidebarMenuComponent,
    LoadingComponent,
    InputComponent,
    SelectComponent,
    SearchGroupComponent,
    ConfirmDialogModule,
    DynamicDialogModule,
    InputSwitchModule,
    TransformStatusPipe,
    CalendarModule
  ],
  providers: []
})
export class SharedModule {}
