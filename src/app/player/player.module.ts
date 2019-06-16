import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { PlayerComponent, BurnDialogComponent } from './player.component';
import { CollectionsComponent } from './collections/collections.component';
import { TriumphsComponent } from './triumphs/triumphs.component';
import { CharsComponent } from './chars/chars.component';
import { ChecklistComponent } from './checklist/checklist.component';
import { BountiesComponent, QuestDialogComponent } from './bounties/bounties.component';
import { ProgressComponent } from './progress/progress.component';
import { MilestonesComponent } from './milestones/milestones.component';
import { TriumphTreeComponent } from './triumphs/triumph-tree/triumph-tree.component';
import { TriumphSeasonsComponent } from './triumphs/triumph-seasons/triumph-seasons.component';
import { TriumphSealsComponent } from './triumphs/triumph-seals/triumph-seals.component';
import { TriumphClosestComponent } from './triumphs/triumph-closest/triumph-closest.component';
import { TriumphSearchComponent } from './triumphs/triumph-search/triumph-search.component';
import { TriumphTrackedComponent } from './triumphs/triumph-tracked/triumph-tracked.component';
import { CollectionTreeComponent } from './collections/collection-tree/collection-tree.component';
import { CollectionSearchComponent } from './collections/collection-search/collection-search.component';
import { CollectionBadgesComponent } from './collections/collection-badges/collection-badges.component';
import { CollectionBadgeComponent } from './collections/collection-badge/collection-badge.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [PlayerComponent, QuestDialogComponent, BurnDialogComponent, CollectionsComponent, TriumphsComponent, CharsComponent, ChecklistComponent, BountiesComponent, ProgressComponent, MilestonesComponent, TriumphTreeComponent, TriumphSeasonsComponent, TriumphSealsComponent, TriumphClosestComponent, TriumphSearchComponent, TriumphTrackedComponent, CollectionTreeComponent, CollectionSearchComponent, CollectionBadgesComponent, CollectionBadgeComponent],
  entryComponents: [
    QuestDialogComponent, BurnDialogComponent
  ],
})
export class PlayerModule { }
