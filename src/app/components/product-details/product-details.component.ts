import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../services/product/products.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{


  constructor(
    private ProductService:ProductsService,
    private route: ActivatedRoute
  ) {

  }

  productId: string = '';

  ngOnInit() {
    this.productId=this.route.snapshot.paramMap.get('productId')|| '';

  }


}
