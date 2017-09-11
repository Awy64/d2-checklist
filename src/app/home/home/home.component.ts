import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { ANIMATE_ON_ROUTE_ENTER } from '../../animations/router.transition';
import { SearchResult, BungieService, Platform } from "../../service/bungie.service";
import { Player, Character } from "../../service/parse.service";
import { StorageService } from '../../service/storage.service';
import {ChildComponent} from '../../shared/child.component';

@Component({
  selector: 'anms-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  extends ChildComponent implements OnInit, OnDestroy {
  animateOnRouteEnter = ANIMATE_ON_ROUTE_ENTER;

  platforms: Platform[];
  selectedPlatform: Platform;
  gamerTag: string;

  player: Player;

  constructor(private bungieService: BungieService, storageService: StorageService, private route: ActivatedRoute, private router: Router) {
    super(storageService);
    this.platforms = bungieService.getPlatforms();
    this.selectedPlatform = this.platforms[0];


    this.storageService.settingFeed
      .takeUntil(this.unsubscribe$)
      .subscribe(
      x => {
        if (x.defaultplatform != null) {
          this.setPlatform(x.defaultplatform);
        }
        if (x.defaultgt != null) {
          this.gamerTag = x.defaultgt;
        }
      });
    this.storageService.refresh();

  }

  private setPlatform(type: number) {
    //already set
    if (this.selectedPlatform != null && this.selectedPlatform.type === type) return;

    this.platforms.forEach((p: Platform) => {
      if (p.type === type) {
        this.selectedPlatform = p;
      }
    });
  }

  public history(c: Character){
    this.router.navigate(['/history', c.membershipType, c.membershipId, c.characterId]);
  }

  public routeSearch(): void{
    if (this.selectedPlatform == null) {
      return;
    }
    if (this.gamerTag == null || this.gamerTag.trim().length < 1) {
      return;
    }
    if (this.selectedPlatform.type == this.route.snapshot.params.platform &&
      this.gamerTag == this.route.snapshot.params.gt){
        this.performSearch();
      }
      else{
        this.router.navigate([this.selectedPlatform.type, this.gamerTag]);
      }
  }
  

  public performSearch(): void {
    if (this.selectedPlatform == null) {
      return;
    }
    if (this.gamerTag == null || this.gamerTag.trim().length < 1) {
      return;
    }

    //this.player = null;
    this.loading = true;
    this.bungieService.searchPlayer(this.selectedPlatform.type, this.gamerTag)
      .then((p: SearchResult) => {
        if (p != null) {
          this.bungieService.getChars(p).then((x: Player) => {
            this.player = x;
            console.log("Loaded chars");
            this.loading = false;
          })
        }
        else {
          this.loading = false;
          this.player = null;
        }
      })
      .catch((x) => {
        this.loading = false;
      });
  }

  onPlatformChange() {
    this.storageService.setItem("defaultplatform", this.selectedPlatform.type);
  }

  onGtChange() {
    this.storageService.setItem("defaultgt", this.gamerTag);
  }

  private sub: any;
  ngOnInit() {
    this.sub = this.route.params.takeUntil(this.unsubscribe$).subscribe(params => {
      const platform: string = params['platform'];
      if (platform==null) return;

      
      this.platforms.forEach((p: Platform) => {
        if ((p.type+"") == platform) {
          this.selectedPlatform = p;
        }
        else if (p.desc.toLowerCase() == platform.toLowerCase()){
          this.selectedPlatform = p;
        }
      });
      
      const gt: string = params['gt'];
      this.gamerTag = gt;
      this.performSearch();
    });
  }

}
