from test import cases as case
from test import fixtures as data

from django.test import RequestFactory
from django.core.management import call_command

from vendors.models import Vendor


class VendorLoadTest(case.BaseTestCase):
    
    fixtures = data.get_category_fixtures()

    
    def test_load(self):
        call_command('load_vendors', vpp=1)
        call_command('load_sam')
    
    
    def test_sam_expiration_not_null(self):
        null_vendors = Vendor.objects.filter(sam_expiration_date=None).count()
        self.assertEqual(null_vendors, 0)
