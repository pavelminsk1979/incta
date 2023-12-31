import React, {
    ChangeEvent,
    DetailedHTMLProps,
    InputHTMLAttributes,
    KeyboardEvent,
    ReactNode,
} from 'react'
import s from './Input.module.scss'
//


type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type InputPropsType = Omit<DefaultInputPropsType, 'type'> & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: ReactNode
    spanClassName?: string
    type?: string
    title?: string
}

const Input: React.FC<InputPropsType> = (
    {
        onChange,
        onChangeText,
        onKeyPress,
        onEnter,
        error,
        className,
        spanClassName,
        id,
        type,
        title,

        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e)

        onChangeText?.(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress?.(e)

        onEnter && // если есть пропс onEnter
        e.key === 'Enter' && // и если нажата кнопка Enter
        onEnter() // то вызвать его
    }

    return (
      <div className={s.inputWrapper}>
        <div>{title}</div>
        <input
                id={id}
                type={type ? type : 'text'}
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                className={s.styledInput}
                {...restProps}
            />

        <div
                id={id ? id + '-span' : undefined}
                className='input-info'
            >
          {error}
        </div>
      </div>
    )
}

export default Input
