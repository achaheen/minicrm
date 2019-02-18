import {MainCategory} from '../../shared/model/mainCategory';
import {Subcategory} from '../../shared/model/subcategory';
import {Topic} from '../../shared/model/topic';
import {MainCategoryService} from '../../shared/services/main-category.service';
import {SubCategoryService} from '../../shared/services/sub-category.service';
import {TopicService} from '../../shared/services/topic.service';
import {UtilsService} from '../../shared/services/utils.service';
import {Input} from '@angular/core';
import {GetAuthorizedTopicsRequest} from '../../shared/model/get-authorized-topics-request';

export class BasicTopicSelection {

  constructor(public topicService: TopicService
    , public subCategoryService: SubCategoryService,
              public mainCatService: MainCategoryService, public utils: UtilsService) {
  }

  @Input() public mainCategories: MainCategory[] = [];
  @Input() public selectedMainCategory: MainCategory;
  @Input() public subCategories: Subcategory[] = [];
  @Input() public selectedSubCategory: Subcategory;
  @Input() public topics: Topic[] = [];
  @Input() public selectedTopic: Topic;

  @Input() public enableAdminSelection: Boolean = true;
  public authroizedTopicsRequest: GetAuthorizedTopicsRequest = {permissions: ['read']};

  public updateTopicList() {
    if (!this.enableAdminSelection) {
      if (this.selectedSubCategory != null && this.selectedSubCategory.id != null) {
        this.authroizedTopicsRequest.subCat = this.selectedSubCategory.id;
        this.topicService.authorized(this.authroizedTopicsRequest).subscribe(
          result => {
            const topic: Topic = {id: null, arabicLabel: 'Select Topic', englishLabel: 'Select Topic'};
            this.topics = result;
            this.topics.unshift(topic);
          }
        );

      } else {
        this.topics = [];
        this.selectedTopic = null;
      }
    } else {
      if (this.selectedSubCategory != null && this.selectedSubCategory.id != null) {

        this.topicService.active(this.selectedSubCategory.id).subscribe(
          result => {
            const topic: Topic = {id: null, arabicLabel: 'Select Topic', englishLabel: 'Select Topic'};
            this.topics = result;
            this.topics.unshift(topic);
          }
        );

      } else {
        this.topics = [];
        this.selectedTopic = null;
      }
    }
  }

  public updateSubCategory() {
    if (!this.enableAdminSelection) {
      if (this.selectedMainCategory != null && this.selectedMainCategory.id != null) {
        this.authroizedTopicsRequest.mainCat = this.selectedMainCategory.id;

        console.log("Request " + JSON.stringify(this.authroizedTopicsRequest));
        this.subCategoryService.authorized(this.authroizedTopicsRequest).subscribe(
          result => {
            this.subCategories = result;
            const subcategory: Subcategory = {englishLabel: 'Select Sub Category', arabicLabel: 'Select Sub Category', id: null};
            this.subCategories.unshift(subcategory);
          }
        );
      } else {
        this.topics = [];
        this.selectedTopic = null;
        this.selectedSubCategory = null;
        this.subCategories = [];
      }
    } else {
      if (this.selectedMainCategory != null && this.selectedMainCategory.id != null) {
        this.subCategoryService.active(this.selectedMainCategory.id).subscribe(
          result => {
            this.subCategories = result;
            const subcategory: Subcategory = {englishLabel: 'Select Sub Category', arabicLabel: 'Select Sub Category', id: null};
            this.subCategories.unshift(subcategory);
          }
        );
      } else {
        this.topics = [];
        this.selectedTopic = null;
        this.selectedSubCategory = null;
        this.subCategories = [];
      }
    }
  }

  public listAllMainCategories() {
    if (!this.enableAdminSelection) {
      this.mainCatService.authorized(this.authroizedTopicsRequest).subscribe(
        result => {
          const mainCat: MainCategory = {id: null, arabicLabel: 'Select Main Category', englishLabel: 'Select Main Category'};
          this.mainCategories = result;
          this.mainCategories.unshift(mainCat);
        }, error1 => {

        }
      );
    } else {
      this.mainCatService.active().subscribe(
        result => {
          const mainCat: MainCategory = {id: null, arabicLabel: 'Select Main Category', englishLabel: 'Select Main Category'};
          this.mainCategories = result;
          this.mainCategories.unshift(mainCat);
        }, error1 => {

        }
      );
    }
  }


}
