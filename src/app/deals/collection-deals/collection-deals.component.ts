import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { VendorDeals } from '@app/service/vendor.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'd2c-collection-deals',
  templateUrl: './collection-deals.component.html',
  styleUrls: ['./collection-deals.component.scss']
})
export class CollectionDealsComponent {
  @Input() vendorDeals: VendorDeals;

}
