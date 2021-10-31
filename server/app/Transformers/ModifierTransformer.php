<?php

namespace App\Transformers;

use App\Models\Modifier;
use League\Fractal\TransformerAbstract;

class ModifierTransformer extends TransformerAbstract
{
    /**
     * List of resources to automatically include
     *
     * @var array
     */
    protected $defaultIncludes = [
        'modifierDetails'
    ];

    /**
     * List of resources possible to include
     *
     * @var array
     */
    protected $availableIncludes = [
        //
    ];

    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(Modifier $modifier)
    {
        return [
            'id' => $modifier->id,
            'name' => $modifier->name
        ];
    }

    public function includeModifierDetails(Modifier $modifier)
    {
        return $this->collection($modifier->details, new ModifierDetailsTransformer());
    }
}
