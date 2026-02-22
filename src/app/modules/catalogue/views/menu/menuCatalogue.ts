import { Component, inject, signal } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MenuItemCard } from "../../components/menu_item_card/menuItemCard";
import { CatalogueService } from "../../services/catalogue.service";
import { MenuItem } from "../../../restaurant/entities/menu_item";

@Component({
    selector: 'menu-catalogue',
    templateUrl: './menuCatalogue.html',
    styleUrl: '../catalogue.scss',
    imports: [MenuItemCard]
})
export class MenuCatalogue {
    activatedRoute = inject(ActivatedRoute);
    service = inject(CatalogueService);
    items = signal<MenuItem[]>([]);

    ngOnInit() {
        this.activatedRoute.params.subscribe(params=>
            this.service.menuCatalogue(params['id']).subscribe((res)=>this.items.set(res))
        );
    }
}