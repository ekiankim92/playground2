import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import Switch, { SwitchProps } from '@mui/material/Switch';

/**
 * 커스텀 스위치 컴포넌트
 *
 * MUI의 Switch 컴포넌트를 기반으로 커스텀 스타일을 적용한 토글 스위치입니다.
 * 리플 효과가 비활성화되어 있으며, 크기와 색상이 디자인 시스템에 맞게 조정되었습니다.
 */
export const CustomSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName='.Mui-focusVisible' disableRipple {...props} />
))(({ theme }) => ({
  'width': 32,
  'height': 18,
  'padding': 0,
  '& .MuiSwitch-switchBase': {
    'padding': 0,
    'margin': 2,
    'transitionDuration': '300ms',
    '&.Mui-checked': {
      'transform': 'translateX(14px)',
      'color': 'var(--Gray-G0)',
      '& + .MuiSwitch-track': {
        backgroundColor: 'var(--KB-Yellow-Light)',
        opacity: 1,
        border: 0,
        ...theme.applyStyles('dark', {
          backgroundColor: '#2ECA45',
        }),
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid var(--Gray-G0)',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.grey[100],
      ...theme.applyStyles('dark', {
        color: theme.palette.grey[600],
      }),
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7,
      ...theme.applyStyles('dark', {
        opacity: 0.3,
      }),
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 14,
    height: 14,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: '#E9E9EA',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
    ...theme.applyStyles('dark', {
      backgroundColor: '#39393D',
    }),
  },
}));

/**
 * 커스텀 폼 컨트롤 라벨 컴포넌트
 *
 * MUI의 FormControlLabel 컴포넌트를 기반으로 커스텀 스타일을 적용한 라벨 컴포넌트입니다.
 * 스위치와 함께 사용하기 위해 높이와 정렬이 최적화되어 있으며,
 * 라벨 텍스트의 폰트 크기와 색상이 디자인 시스템에 맞게 조정되었습니다.
 */
export const CustomFormControlLabel = styled(FormControlLabel)({
  'height': '24px',
  'margin': 0,
  'padding': 0,
  'alignItems': 'center',
  '& .MuiFormControlLabel-label': {
    fontSize: '12px',
    fontWeight: 500,
    color: 'var(--Gray-G75)',
  },
});
