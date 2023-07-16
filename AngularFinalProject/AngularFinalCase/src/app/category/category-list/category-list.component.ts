import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Category } from '../category'; // '../category' dosyasından Category modelini import ediyoruz
import { CategoryService } from '../category.service'; // '../category.service' dosyasından CategoryService'i import ediyoruz
import { Router } from '@angular/router';
import { PostService } from 'src/app/posts/post.service'; // 'src/app/posts/post.service' dosyasından PostService'i import ediyoruz
import { MatTableDataSource } from '@angular/material/table'; // Angular Material MatTableDataSource'i import ediyoruz
import { MatPaginator } from '@angular/material/paginator'; // Angular Material MatPaginator'ı import ediyoruz

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator; // MatPaginator bileşenini ViewChild ile referans olarak alıyoruz
  categories: Category[] = []; // Kategoriler dizisi
  dataSource = new MatTableDataSource<Category>(); // MatTableDataSource ile kategori verilerini depoluyoruz
  displayedColumns: string[] = ['categoryId', 'categoryName', 'creationDate', 'transactions']; // Gösterilen sütunlar
  totalItems: any; // Toplam öğe sayısı

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private postService: PostService
  ) {
    this.getAllCategories(); // Tüm kategorileri al
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator; // Paginator bileşenini ayarla
  }

  getAllCategories() {
    if (this.categoryService.getCategories().length === 0) { // Kategoriler henüz yüklenmediyse
      this.categoryService.setCategories(); // CategoryService'ten kategorileri yükle
    }
    this.categories = this.categoryService.getCategories(); // Kategorileri al
    if (this.categories != undefined) { // Kategoriler tanımlıysa
      this.totalItems = this.categories.length; // Toplam öğe sayısını belirle
      this.dataSource = new MatTableDataSource(this.categories); // Kategori verilerini MatTableDataSource içerisine ata
    }
  }

  handleDeleteClick($event: number) {
    this.categoryService.deleteCategory($event); // CategoryService üzerinden kategori silme işlemini yap
    this.categories = this.categoryService.getCategories(); // Kategorileri al
    this.totalItems = this.categories.length; // Toplam öğe sayısını güncelle
    this.dataSource = new MatTableDataSource(this.categories); // Kategori verilerini MatTableDataSource içerisine ata
    this.dataSource.paginator = this.paginator; // Paginator bileşenini güncelle
  }

  handleDetailClick($event: number): void {
    this.router.navigate(["/categorylist/", $event]); // Kategori detayına yönlendir
  }

  applyFilter(filterValue: any): void {
    this.dataSource.filter = filterValue.value.trim().toLowerCase(); // Veri filtresini uygula
  }
}
