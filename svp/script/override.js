/********************************************************
override.js - version 4.3

This file is a part of SmoothVideo Project (SVP) package.
See License_eng.txt for licensing.

Description: add some custom script options processing here

********************************************************/

override = function()
{
// It's recommended to add needed options via Application settings -> 
//	Additional options -> All settings -> User defines options
	
/***** SVSuper options *****/

//levels.pel				= 2;
//levels.gpu				= 0;

//levels.scale.up			= 2;
//levels.scale.down			= 4;
//levels.full				= true;

/***** SVAnalyse options *****/

//analyse.vectors			= 3;
//analyse.block.w			= 16;
//analyse.block.h			= 16;
//analyse.block.overlap			= 2;

//analyse.main.levels			= 0;
//analyse.main.search.type		= 4;
//analyse.main.search.distance		= -4;
//analyse.main.search.sort		= true;
//analyse.main.search.satd		= false;
//analyse.main.search.coarse.type	= 4;
//analyse.main.search.coarse.distance	= 0;
//analyse.main.search.coarse.satd	= true;
//analyse.main.search.coarse.trymany	= false;
//analyse.main.search.coarse.width	= 1050;
//analyse.main.search.coarse.bad.sad	= 1000;
//analyse.main.search.coarse.bad.range	= -24;

//analyse.main.penalty.lambda		= 10.0;
//analyse.main.penalty.plevel		= 1.5;
//analyse.main.penalty.lsad		= 8000;
//analyse.main.penalty.pnew		= 50;
//analyse.main.penalty.pglobal		= 50;
//analyse.main.penalty.pzero		= 100;
//analyse.main.penalty.pnbour		= 50;
//analyse.main.penalty.prev		= 0;

//analyse.refine[0].thsad		= 200;
//analyse.refine[0].search.type		= 4;
//analyse.refine[0].search.distance	= 2;
//analyse.refine[0].search.satd		= false;
//analyse.refine[0].penalty.lambda	= 10.0;
//analyse.refine[0].penalty.lsad	= 8000;
//analyse.refine[0].penalty.pnew	= 50;

/***** SVSmoothFps options *****/

//smooth.rate.num			= 2;
//smooth.rate.den			= 1;
//smooth.rate.abs			= false;

//smooth.algo				= 13;
//smooth.block				= false;
//smooth.cubic				= 0;
//smooth.linear				= true;

//smooth.mask.cover			= 100;
//smooth.mask.area			= 0;
//smooth.mask.area_sharp		= 1.0;
//smooth.mask.area_blend		= 0.4;

//smooth.scene.mode			= 3;
//smooth.scene.adaptive			= 210;
//smooth.scene.force13			= true;
//smooth.scene.luma			= 1.5;
//smooth.scene.blend			= false;
//smooth.scene.limits.m1		= 1600;
//smooth.scene.limits.m2		= 2800;
//smooth.scene.limits.scene		= 4000;
//smooth.scene.limits.zero		= 200;
//smooth.scene.limits.blocks		= 20;

//smooth.light.aspect			= 0.0;
//smooth.light.sar			= 1.0;
//smooth.light.border			= 12;
//smooth.light.lights			= 16;
//smooth.light.length			= 100;
//smooth.light.cell			= 1.0;

//smooth.gpuid				= 0;

/***** Additional SVSmoothFps_NVOF options *****/

//smooth.nvof_q				= 2;

}
