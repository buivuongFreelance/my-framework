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
	<link rel="stylesheet" type="text/css" href="{{ URL::asset('css/style.css') }}">
	<style type="text/css">
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
	</style>
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
	<script type="text/javascript" stc="{{ URL::asset('metronic/assets/layouts/layout3/scripts/layout.min.js') }}"></script>
	<!-- END BEGIN THEME LAYOUT SCRIPTS -->
    <script type="text/javascript" src="{{ URL::asset('js/is.min.js') }}"></script>
    <script type="text/javascript" src="{{ URL::asset('js/bundle.js') }}"></script>
</body>
</html>