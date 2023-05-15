using System.Web;
using System.Web.Optimization;

namespace WebApplication1
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/commonlayout").Include(
                       "~/Scripts/angular.min.js"));
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));
            //-----------Javascript--------
            bundles.Add(new ScriptBundle("~/bundles/layout").Include(
                        "~/Scripts/CBL/Global.js",
                        "~/Scripts/CBL/Master.js"));
            bundles.Add(new ScriptBundle("~/bundles/FW").Include(
                        "~/Scripts/FiveWProfile/FiveWProfile.js"));
            bundles.Add(new ScriptBundle("~/bundles/DMD").Include(
                       "~/Scripts/DrinkingMomentsDeepDive/DrinkingMomentsDeepDive.js"));
            bundles.Add(new ScriptBundle("~/bundles/AA").Include(
                       "~/Scripts/BrandFitAnalysis/BrandFitAnalysis.js"));
            //-----------CSS--------
            bundles.Add(new StyleBundle("~/Content/MasterStyles").Include(
                      "~/Content/CBL/Master.css"));
            bundles.Add(new StyleBundle("~/Content/FWStyles").Include(
                      "~/Content/FiveWProfile/FiveWProfile.css"));
            bundles.Add(new StyleBundle("~/Content/DMDStyles").Include(
                      "~/Content/DrinkingMomentsDeepDive/DrinkingMomentsDeepDive.css"));
            bundles.Add(new StyleBundle("~/Content/AAStyles").Include(
                      "~/Content/BrandFitAnalysis/BrandFitAnalysis.css"));
        }
    }
}
