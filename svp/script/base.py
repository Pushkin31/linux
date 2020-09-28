########## BEGIN OF base.py ##########
# This file is a part of SmoothVideo Project (SVP) ver.4
# This is NOT the full Vapoursynth script, all used variables are defined via
# JScript code that generates the full script text.

def interpolate(clip):
# input_um - original frame in 4:2:0
# input_m  - cropped and resized (if needed) frame
# input_m8 - input_m converted to 8-bit
#RESIZE-CODE
    if nvof:
        smooth  = core.svp2.SmoothFps_NVOF(input_m,smoothfps_params,nvof_src=input_m8,src=input_um,fps=src_fps)
    else:
        super   = core.svp1.Super(input_m8,super_params)
        vectors = core.svp1.Analyse(super["clip"],super["data"],input_m8,analyse_params)
        smooth  = core.svp2.SmoothFps(input_m,super["clip"],super["data"],vectors["clip"],vectors["data"],smoothfps_params,src=input_um,fps=src_fps)
#FORCE-CFR

    if demo_mode==1:
        return demo(input_m,smooth)
    else:
        return smooth

if stereo_type == 1:
    lf = interpolate(core.std.CropRel(clip,0,(int)(clip.width/2),0,0))
    rf = interpolate(core.std.CropRel(clip,(int)(clip.width/2),0,0,0))
    smooth = core.std.StackHorizontal([lf, rf])
elif stereo_type == 2:
    lf = interpolate(core.std.CropRel(clip,0,0,0,(int)(clip.height/2)))
    rf = interpolate(core.std.CropRel(clip,0,0,(int)(clip.height/2),0))
    smooth = core.std.StackVertical([lf, rf])
else:
    smooth =  interpolate(clip)
########### END OF base.py ###########
