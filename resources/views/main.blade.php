<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Primacare</title>

	<!-- BEGIN GLOBAL MANDATORY STYLES -->
	<link href='http://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" type="text/css" href="{{ URL::asset('metronic/assets/global/plugins/font-awesome/css/font-awesome.min.css') }}">
	<link rel="stylesheet" type="text/css" href="{{ URL::asset('metronic/assets/global/plugins/simple-line-icons/simple-line-icons.min.css') }}">
	<link rel="stylesheet" type="text/css" href="{{ URL::asset('metronic/assets/global/plugins/bootstrap/css/bootstrap.min.css') }}">
	<link rel="stylesheet" type="text/css" href="{{ URL::asset('metronic/assets/global/plugins/uniform/css/uniform.default.css') }}">
	<link rel="stylesheet" type="text/css" href="{{ URL::asset('metronic/assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css') }}">
	<!-- END BEGIN GLOBAL MANDATORY STYLES -->
	<!-- BEGIN THEME GLOBAL STYLES -->
	<link rel="stylesheet" type="text/css" href="{{ URL::asset('metronic/assets/global/css/components.min.css') }}">
	<link rel="stylesheet" type="text/css" href="{{ URL::asset('metronic/assets/global/css/plugins.min.css') }}">
	<!-- END BEGIN THEME GLOBAL STYLES -->
	<!-- BEGIN THEME LAYOUT STYLES -->
	<link rel="stylesheet" type="text/css" href="{{ URL::asset('metronic/assets/layouts/layout3/css/layout.min.css') }}">
	<link rel="stylesheet" type="text/css" href="{{ URL::asset('metronic/assets/layouts/layout3/css/themes/default.css') }}">
	<link rel="stylesheet" type="text/css" href="{{ URL::asset('metronic/assets/layouts/layout3/css/custom.min.css') }}">
	<!-- END BEGIN THEME LAYOUT STYLES -->
	<!-- BEGIN PAGE LEVEL STYLES -->
	<link rel="stylesheet" type="text/css" href="{{ URL::asset('metronic/assets/global/plugins/bootstrap-toastr/toastr.min.css') }}">
	<link rel="stylesheet" type="text/css" href="{{ URL::asset('metronic/assets/pages/css/login.min.css') }}">
	<!-- END BEGIN PAGE LEVEL STYLES -->
	<!--<link rel="stylesheet" type="text/css" href="{{ URL::asset('css/style.css') }}">-->
	<!--<style type="text/css">
		.page-header .page-header-menu{
			background: #3fce92;
		}
		.page-header .page-header-menu .hor-menu .navbar-nav > li.active > a, .page-header .page-header-menu .hor-menu .navbar-nav > li.active > a:hover, .page-header .page-header-menu .hor-menu .navbar-nav > li.current > a, .page-header .page-header-menu .hor-menu .navbar-nav > li.current > a:hover{
			color: #fff;
			text-transform: uppercase;
			font-weight: 700;
			background: #25b679;
		}
		.page-header .page-header-menu .hor-menu .navbar-nav > li > a{
			color: #fff;
			text-transform: uppercase;
			font-weight: 700;
		}
		.page-header .page-header-menu .hor-menu .navbar-nav > li:hover > a, .page-header .page-header-menu .hor-menu .navbar-nav > li.open > a, .page-header .page-header-menu .hor-menu .navbar-nav > li > a:hover, .page-header .page-header-menu .hor-menu .navbar-nav > li > a:focus, .page-header .page-header-menu .hor-menu .navbar-nav > li > a:active{
			background: #25b679;
		}
		.page-header .page-header-menu .search-form .input-group .form-control{
			background: #fafaf6;
		}
		.page-header .page-header-menu .search-form .input-group{
			background: #fafaf6;
		}
		.form-control{
			height: 34px;
		}
		.page-header .page-header-top .page-logo .logo-default{
			margin: 17.5px 0 0;
		}
		.form-group{
			margin-bottom: 15px;
		}
		.portlet.box.green.login{
			width: 600px;
			margin: auto;
		}
		.portlet.box.green>.portlet-title, .portlet.green, .portlet>.portlet-body.green{
			background: #3fce92;
		}
		.btn.green:not(.btn-outline){
			background: #3fce92;
		}
		.btn.green:not(.btn-outline).active, .btn.green:not(.btn-outline):active, .btn.green:not(.btn-outline):hover, .open>.btn.green:not(.btn-outline).dropdown-toggle{
			background: #25b679;
			border-color: #25b679;
		}
		.forget-password{
			line-height: 32px;
		}
		.mg-top-40{
			margin-top: 40px;
		}
		.page-spinner-bar > div, .block-spinner-bar > div{
			background: #3fce92;
		}
		/* Remove scroll on the body when react-modal is open */
		.ReactModal__Overlay {
			-webkit-perspective: 600;
			perspective: 600;
			opacity: 0;
			overflow-x: hidden;
			overflow-y: auto;
			background-color: rgba(0, 0, 0, 0.5);
		}

		.ReactModal__Overlay--after-open {
			opacity: 1;
			transition: opacity 150ms ease-out;
		}

		.ReactModal__Content {
			-webkit-transform: scale(0.5) rotateX(-30deg);
			transform: scale(0.5) rotateX(-30deg);
		}

		.ReactModal__Content--after-open {
			-webkit-transform: scale(1) rotateX(0deg);
			transform: scale(1) rotateX(0deg);
			transition: all 150ms ease-in;
		}

		.ReactModal__Overlay--before-close {
			opacity: 0;
		}

		.ReactModal__Content--before-close {
			-webkit-transform: scale(0.5) rotateX(30deg);
			transform: scale(0.5) rotateX(30deg);
			transition: all 150ms ease-in;
		}

		.ReactModal__Content.modal-dialog {
  			border: none;
  			background-color: transparent;
}
	</style>-->
</head>
<body>
	<div id="app"/>
	<!-- BEGIN CORE PLUGINS -->
	<script type="text/javascript" src="{{ URL::asset('metronic/assets/global/plugins/jquery.min.js') }}"></script>
	<script type="text/javascript" src="{{ URL::asset('metronic/assets/global/plugins/bootstrap/js/bootstrap.min.js') }}"></script>
	<script type="text/javascript" src="{{ URL::asset('metronic/assets/global/plugins/js.cookie.min.js') }}"></script>
	<script type="text/javascript" src="{{ URL::asset('metronic/assets/global/plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js') }}"></script>
	<script type="text/javascript" src="{{ URL::asset('metronic/assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js') }}"></script>
	<script type="text/javascript" src="{{ URL::asset('metronic/assets/global/plugins/jquery.blockui.min.js') }}"></script>
	<script type="text/javascript" src="{{ URL::asset('metronic/assets/global/plugins/uniform/jquery.uniform.min.js') }}"></script>
	<script type="text/javascript" src="{{ URL::asset('metronic/assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js') }}"></script>
	<!-- END BEGIN CORE PLUGINS -->
	<!-- BEGIN THEME GLOBAL SCRIPTS -->
	<script type="text/javascript" src="{{ URL::asset('metronic/assets/global/scripts/app.min.js') }}"></script>
	<!-- END BEGIN THEME GLOBAL SCRIPTS -->
	<!-- BEGIN THEME LAYOUT SCRIPTS -->
	<script type="text/javascript" src="{{ URL::asset('metronic/assets/layouts/layout3/scripts/layout.min.js') }}"></script>
	<!-- END BEGIN THEME LAYOUT SCRIPTS -->
	<!-- BEGIN PAGE SCRIPTS -->
	<script type="text/javascript" src="{{ URL::asset('metronic/assets/global/plugins/bootstrap-toastr/toastr.min.js') }}"></script>
	<script type="text/javascript" src="{{ URL::asset('metronic/assets/pages/scripts/ui-blockui.min.js') }}"></script>
	<!-- END BEGIN PAGE SCRIPTS -->
    <script type="text/javascript" src="{{ URL::asset('js/is.min.js') }}"></script>
    <script type="text/javascript" src="{{ URL::asset('js/init.js') }}"></script>
    <script type="text/javascript" src="{{ URL::asset('js/vendor.js') }}"></script>
    <script type="text/javascript" src="{{ URL::asset('js/bootstrap.js') }}"></script>
</body>